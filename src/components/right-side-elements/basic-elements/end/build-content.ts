import { RightSideData } from "./end"

export default function getContent({data}: {data:RightSideData}, params: any) {
    const rightSideData = data
    return {
      type: "data",
      data: {
        text: rightSideData.botSays
      }
    }
}