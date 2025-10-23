import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ConfigCard({ title, children }: { title: string, children: ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}
