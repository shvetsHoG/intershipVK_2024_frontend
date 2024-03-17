import {FactService} from "../api/FactService.ts";
import {useQuery} from "@tanstack/react-query";
import {FETCH_FACT} from "../consts/Consts.ts";

export const useFact = () => {
    return useQuery(
        {
            queryKey: [FETCH_FACT, 1],
            queryFn: () => FactService.getFact(),
            select: (({data}) => data.fact),
            enabled: true,
        }
    )
}