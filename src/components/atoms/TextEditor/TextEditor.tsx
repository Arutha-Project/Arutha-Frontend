import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditorStyles.scss';
import { Button } from '..';
import { buttonContainerStyle, okBtnStyle } from './TextEditorStyle';

interface TextEditorProps {
    onSubmit: (text: string) => void;
    buttonName: string;
    modules?: any;
    formats?: string[];
}

const defaultModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};

const defaultFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
];

const TextEditor: React.FC<TextEditorProps> = ({ onSubmit, buttonName, modules = defaultModules, formats = defaultFormats }) => {
    const [text, setText] = useState('');

    const handleChange = (value: string) => {
        setText(value);
    };

    const handleButtonClick = () => {
        onSubmit(text);
    };

    return (
        <div>
            <ReactQuill
                value={text}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder="Enter here"
            />
            <div style={buttonContainerStyle}>
                <Button text={buttonName} style={okBtnStyle} handleOnClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default TextEditor;
