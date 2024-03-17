import {FactService} from "../api/FactService.ts";
import {useQuery} from "@tanstack/react-query";
import {FETCH_AGE} from "../consts/Consts.ts";

export const useAge = (name:string) => {

    return useQuery(
        {
            queryKey: [FETCH_AGE, {name}],
            queryFn: () => FactService.getAge(name),
            select: ((data) => data.data),
            enabled : !!name,
            retry: 1,
        }
    )
}