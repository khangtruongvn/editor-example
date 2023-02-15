import { Controller, useForm } from "react-hook-form";
import "./App.css";
import Editor from "./Editor";

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <div className="App">
      <form>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <Editor {...field} editorID="field_itn_overview_bg_desc" />
          )}
        />

        <button onClick={handleSubmit(onSubmit)}>Upload</button>
      </form>
    </div>
  );
}

export default App;
