import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


interface ReactQuillEditorProps {
    value: string;
    onChange: (params: {}) => void;
    item: any
}

export default function ReactQuillEditor({
    item,
    value,
    onChange,
}: ReactQuillEditorProps) {
    return (
        <div className="custom-editor w-[93%] mb-2">
            <ReactQuill
                theme="snow"
                value={value || ""}
                onChange={onChange}
                formats={item.formats.map((elt: any) => elt.type)}
                modules={item.modules}
                className="my-4 text-foreground dark:border-border rounded-md dark:text-foreground"
            />
        </div>
    );
}
