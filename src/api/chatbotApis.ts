import client from "./client";

const createChatbot = (body: any) =>
    client.post(`/chatbots`, body);

const updateChatbot = (id: string | number, body: any) =>
    client.put(`/chatbots/${id}`, body);

const getChatbot = (id: string) =>
    client.get(`/chatbot/${id}`);

const listChatbots = () =>
    client.get(`/chatbots`);

const deleteChatbot = (id: string | number) =>
    client.delete(`/chatbots/${id}`);

const activateChatbot = (id: string | number, body: any) =>
    client.post(`/activate/${id}`, body);

const deactivateChatbot = (id: string | number) =>
    client.get(`/deactivate/${id}`);

const testNode = (body: any) =>
    client.post(`/test_node`, body);

const fetchCreds = () =>
    client.get(`/credentials`);

const createCred = (body: Record<string, any>) =>
    client.post(`credentials`, body);
const deleteCred = (id: string | number) =>
    client.delete(`/credentials/${id}`);

export default {
    createChatbot,
    updateChatbot,
    getChatbot,
    listChatbots,
    deleteChatbot,
    activateChatbot,
    deactivateChatbot,
    testNode,
    fetchCreds,
    createCred,
    deleteCred
};