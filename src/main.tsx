import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Provider} from "react-redux";
import {store} from "./store";
import '@vkontakte/vkui/dist/vkui.css'
import {AdaptivityProvider} from "@vkontakte/vkui";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AdaptivityProvider>
                <App/>
            </AdaptivityProvider>
        </QueryClientProvider>
    </Provider>
)
