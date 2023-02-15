import axios from "axios";
import { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const handleUploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "docs_upload_example_us_preset");
    const config = {
      method: "POST",
      url: "https://api.cloudinary.com/v1_1/demo/image/upload",

      data: formData,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Editor = ({ value, onChange, editorID }) => {
  const editorRef = useRef();

  const handleOnChangeEditor = (value) => onChange(value)

  const quillImageCallback = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const upload = await handleUploadImage(file);
        let quill = editorRef?.current?.getEditor();
        const range = quill.getSelection(true);
        quill?.insertEmbed(range.index, "image", upload.url);
      }
    };
  }, []);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: quillImageCallback,
        },
      },
    };
  }, [quillImageCallback]);

  return (
    <>
      <label>Editor cho ng dan</label>
      <ReactQuill
        id={editorID}
        ref={editorRef}
        theme="snow"
        value={value}
        modules={modules}
        onChange={handleOnChangeEditor}
      />
    </>
  );
};

export default Editor;
