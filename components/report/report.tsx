import {ReportType} from "./types";
import { Button } from 'antd'
import { useRouter } from "next/router";

type reportProps = {
    report?: ReportType
}

function Report( { report }: reportProps ){
    const router = useRouter()
    return (
            <>
            asdas
            <Button onClick={() => {
                router.forward()
            }}>Назад</Button>
            </>

    )
}

export default Report