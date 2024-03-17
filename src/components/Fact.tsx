import {FC, useEffect, useRef, useState} from 'react';
import {FETCH_FACT} from "../consts/Consts.ts";
import {useFact} from "../hooks/useFact.ts";
import {useQueryClient} from "@tanstack/react-query";

const Fact: FC = () => {

    const [value, setValue] = useState<string>('')
    const {isLoading, error, data} = useFact()

    const queryClient = useQueryClient()
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
                ? <div>Loading...</div>
                : <div>
                    <input onChange={(e) =>
                        setValue(e.target.value)}
                           style={{padding: "5px 15px", width: "800px"}}
                           type="text"
                           value={value}
                           ref={ref}/>
                    <button onClick={() => queryClient.invalidateQueries(FETCH_FACT)}>Получить факт</button>
                </div>
            }
        </div>
    );
};

export default Fact;