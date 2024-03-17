import {IAge, IFact} from "../types/Types.ts";
import axios from "axios";


export class FactService {
     public static getFact = async () => {
        const data = await axios.get<IFact>('https://catfact.ninja/fact');
        return data
    }

    public static getAge = async (name: string) => {
        const data = await axios.get<IAge>('https://api.agify.io/', {
            params: {
                name
            }
        });
        return data
    }
}