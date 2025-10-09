import { useEffect, useState } from 'react'
import chatbotApis from '../../../api/chatbotApis'
import { useCredentialStore } from '../../../store/credentials-store'
import { SearchableSelect } from '../../custom/searchable-select'
import { Label } from '../../ui/label'
import { modelOptions } from './static-data'
import { Input } from '../../ui/input'
import { useFlowStore } from '../../../store/flow-store'

const CredentialsFields = () => {
    const { loading, credentials, fetchCreds } = useCredentialStore()
    const { setModelData, modelData } = useFlowStore()
    const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

    useEffect(() => {
        fetchCreds?.()
    }, [])


    const getModels = async (url: string, cred: string): Promise<void> => {
        setIsLoadingList(true)
        try {
            const response = await chatbotApis.getModels(url, {
                credential_name: cred,
                modelType: modelData.provider === "googleGenerativeAi" ? "generateContent" : "chat",
            });
            setModelData({
                models: response.data.Models.map((elm: string) => {
                    return {
                        label: elm,
                        value: elm
                    }
                })
            });
        } catch (error: any) {
            console.error("Failed to fetch workflows:", error);
            setModelData({ models: [] });
        } finally {
            setIsLoadingList(false)
        }
    };

    return (
        <div className="flex items-end gap-4 p-2">
            <div className="flex flex-col w-1/3">
                <Label className="text-sm font-medium mb-1">Provider</Label>
                <SearchableSelect
                    className="w-full"
                    name="provider"
                    placeholder="Select provider"
                    options={modelOptions}
                    value={modelData?.provider || ""}
                    onChange={(value) => {
                        const selectedObj =
                            modelOptions.find((opt) => opt.value === value) || null;
                        setModelData({ ...selectedObj, model: "", models: [], provider: selectedObj?.value, url: selectedObj?.url ? selectedObj.url : "" });
                    }}
                />
            </div>

            <div className="flex flex-col w-1/3">
                <Label className="text-sm font-medium mb-1">Credentials</Label>
                <SearchableSelect
                    showRefresh
                    loading={loading}
                    disabled={loading}
                    onRefresh={fetchCreds}
                    className="w-full"
                    name="credential"
                    placeholder="Select credential"
                    options={credentials
                        .filter((item) => item.type === modelData?.credType)
                        .map((elm) => ({
                            label: elm.name,
                            value: elm.name,
                        }))}
                    value={modelData.credential || ""}
                    onChange={(value) => {
                        setModelData({ credential: value });
                        if (modelData.url) getModels(modelData.url, value);
                    }}
                />
            </div>

            <div className="flex flex-col w-1/3">
                <Label className="text-sm font-medium mb-1">Model</Label>
                {modelData.url ? <SearchableSelect
                    showRefresh
                    onRefresh={() => getModels(modelData.url, modelData.credential)}
                    loading={isLoadingList}
                    disabled={isLoadingList || loading}
                    className="w-full"
                    placeholder="Select model"
                    name="model"
                    options={modelData.models}
                    value={modelData.model || ""}
                    onChange={(value) => setModelData({ model: value || "" })}
                />
                    :
                    <Input
                        id={`model`}
                        placeholder="model"
                        value={modelData.model || ""}
                        onChange={(e) => setModelData({ model: e.target.value })}
                    />}
            </div>
        </div>
    );

}

export default CredentialsFields