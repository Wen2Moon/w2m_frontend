interface CheckboxComponentProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  id,
  label,
  checked = false,
  onChange,
}) => {
  return (
    <div className="flex items-center bg-bgBtn p-2 border border-[#FFFFFF] rounded-md">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="
            hidden" // Hide the default checkbox
        />
        <div className={`
          w-5 
          h-5 
          border-2 
          border-white 
          rounded
          flex 
          items-center 
          justify-center
          ${checked ? 'bg-white' : 'bg-transparent'}
        `}>
          {checked && (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-bgBtn" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          )}
        </div>
        <span className="ml-2 text-white text-sm">
          {label}
        </span>
      </label>
    </div>
  );
};

export default CheckboxComponent;
