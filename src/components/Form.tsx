import {useAge} from "../hooks/useAge.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAge, IForm} from "../types/Types.ts";
import {FC, useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {setName, setNameArray} from "../store/slices/NameSlice.ts";
import {UseQueryResult} from "@tanstack/react-query";
import {Button, Div, FormField} from "@vkontakte/vkui";
import classes from "./Panels.module.css"
import {Icon28Spinner} from "@vkontakte/icons";

const Form: FC = () => {

    const schema = yup.object({
        name: yup
            .string()
            .required("Введите имя!")
            .matches(/^[a-zA-Zа-яА-Я]*$/, "Имя должно содержать только буквы"),
    })

    const name: string = useSelector(state => state.name.name)
    const nameArr: string[] = useSelector(state => state.name.nameArray)
    const dispatch = useDispatch()
    const {isLoading, data, error, refetch}: UseQueryResult<IAge> = useAge(name)
    const {
        register, handleSubmit, watch,
        formState: {errors}
    } = useForm<IForm>(
        {resolver: yupResolver(schema), mode: "onChange"}
    )

    /**
     * @param {string} name
     * Функция изначально добавляет имя, полученное из input-a
     * в массив имен, по которым уже был сделан запрос.
     * Поэтому клиент не может отправить повторный запрос на сервер с тем же именем даже с плохим интернетом,
     * данные для отображения по именам по которым уже был сделан запрос берутся из кэша.
     */
    const submit: SubmitHandler<IForm> = ({name}) => {
        clearTimeout(timerId);
        dispatch(setName(name))
        if (!nameArr.includes(name)) {
            dispatch(setNameArray(name))
            refetch()
        }
    }

    let timerId: number;

    useEffect(() => {
        const subscription = watch(() => {
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    handleSubmit(submit)()
                }, 3000)
            }
        )
        return () => subscription.unsubscribe()
    }, [watch]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <FormField style={{marginBottom:"10px"}}>
                <input placeholder={"Введите имя..."} className={classes.wrapper} type="text" {...register('name')}/>
            </FormField>
            <div style={{color: "red", marginBottom: "10px"}}>{errors.name?.message}</div>
            <div>
                {error &&
                    <div style={{marginBottom: "10px"}}>Ошибка, попробуйте еще раз через некоторое время</div>
                }
                {isLoading
                    ? <div style={{display: "flex", justifyContent: "center"}}>
                        <Icon28Spinner className="spinner"></Icon28Spinner>
                    </div>
                    : data &&
                    (data.count
                        ? <div style={{marginBottom: "10px"}}>Возраст {data.name}: {data.age}</div>
                        : <div style={{marginBottom: "10px"}}>Не получилось вернуть возраст по данному имени :(</div>)}
            </div>
            <Button size="m" type={"submit"}>Получить возраст</Button>
        </form>

    );
};

export default Form;