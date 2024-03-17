import {
    Cell,
    Group,
    Panel, PanelHeader, Placeholder, Separator, SplitCol, SplitLayout,
    useAdaptivityConditionalRender,
    usePlatform, View
} from "@vkontakte/vkui";
import {useState} from "react";
import Form from "./components/Form.tsx";
import Fact from "./components/Fact.tsx";

const panels = ['Факт', 'Форма'];

export const App = () => {
    const platform = usePlatform();
    const { viewWidth } = useAdaptivityConditionalRender();
    const [panel, setPanel] = useState(panels[0]);

    const isVKCOM = platform === 'vkcom';

    return (
        <SplitLayout
            style={{ justifyContent: 'center'}}
            header={!isVKCOM && <PanelHeader delimiter="none" />}
        >
            {viewWidth.tabletPlus && (
                <SplitCol className={viewWidth.tabletPlus.className} width={280} maxWidth={280}>
                    <Panel>
                        {!isVKCOM && <PanelHeader />}
                        <Group>
                            {panels.map((i) => (
                                <Cell key={i} hovered={i === panel} onClick={() => setPanel(i)}>
                                    {i}
                                </Cell>
                            ))}
                        </Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
                <View activePanel={panel}>
                    <Panel id={panels[0]}>
                        <PanelHeader>Получить интересный факт :3</PanelHeader>
                        <Group>
                            <Placeholder header="Получите интересный факт при клике на кнопку!"/>
                            <Fact/>
                        </Group>
                    </Panel>

                    <Panel id={panels[1]}>
                        <PanelHeader>Получить возраст по имени</PanelHeader>
                        <Group>
                            <Placeholder header="Получите возраст человека по имени"/>
                            <Form/>
                        </Group>
                    </Panel>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};