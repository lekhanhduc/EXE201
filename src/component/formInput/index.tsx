import "bootstrap/dist/css/bootstrap.min.css";

interface FormInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}
const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  required = false,
}) => {
  const isTextarea = type === "textarea";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-medium">
          {label}
        </label>
      )}
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          placeholder={placeholder}
          required={required}
          className={`border rounded-lg p-2 w-full focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 ${className}`}
          rows={6} 
          style={{ resize: "vertical" }} 
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border rounded-lg p-2 w-full focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 ${className}`}
        />
      )}
    </div>
  );
};

export default FormInput;
