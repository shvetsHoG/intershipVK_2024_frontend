import {FC, useEffect, useRef, useState} from 'react';
import {FETCH_FACT} from "../consts/Consts.ts";
import {useFact} from "../hooks/useFact.ts";
import {useQueryClient} from "@tanstack/react-query";
import {Button, FormField} from "@vkontakte/vkui";
import classes from "./Panels.module.css"
import {Icon28Spinner} from "@vkontakte/icons";

const Fact: FC = () => {

    const [value, setValue] = useState<string>('')
    const {isLoading, error, data, refetch} = useFact()
    const ref = useRef()

    useEffect(() => {
        if (data) {
            setValue(data)
        }
    }, [data]);

    useEffect(() => {
        if (ref.current) {
            const valueArray = ref.current.value.split(" ")
            ref.current.selectionEnd = valueArray[0].length;
            ref.current.focus();
        }
    }, [ref.current, value]);

    if (error) {
        return <div>Ошибка, попробуйте позже</div>
    }

    return (
        <div>
            {isLoading
                ? <div style={{display: "flex", justifyContent: "center"}}>
                    <Icon28Spinner className="spinner"></Icon28Spinner>
                </div>
                : <div>
                    <FormField style={{marginBottom: "10px"}}>
                        <input placeholder={"Получите факт, нажав на кнопку"}
                               className={classes.wrapper}
                               onChange={(e) => setValue(e.target.value)}
                               type="text"
                               value={value}
                               ref={ref}/>
                    </FormField>
                </div>
            }
            <Button size="m" onClick={() => refetch()}>Получить факт</Button>
        </div>
    );
};

export default Fact;