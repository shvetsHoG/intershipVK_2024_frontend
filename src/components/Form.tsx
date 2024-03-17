import {useAge} from "../hooks/useAge.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAge, IForm} from "../types/Types.ts";
import {FC, useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {setName, setNameArray} from "../store/slices/NameSlice.ts";
import {UseQueryResult} from "@tanstack/react-query";

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
    const {isLoading, data, refetch}: UseQueryResult<IAge> = useAge(name)
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
            <input type="text" {...register('name')}/>
            <button type={"submit"}>Отправить данные</button>
            <p>{errors.name?.message}</p>
            <div>
                {isLoading
                    ? <div>Loading..</div>
                    : data &&
                        (data.count
                            ? data.age
                            : <div>Не получилось вернуть возраст по данному имени :(</div>)}
            </div>
        </form>

    );
};

export default Form;