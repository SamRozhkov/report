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
            <Button onClick={() => {
                router.back()
            }}>Назад</Button>
            </>
    )
}

export default Report