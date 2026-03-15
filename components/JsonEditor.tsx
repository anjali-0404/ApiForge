type JsonEditorProps = {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
};

export default function JsonEditor({ value, onChange, rows = 10, placeholder }: JsonEditorProps) {
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="code-surface w-full resize-y px-4 py-3 text-sm focus:border-violet-400 focus:outline-none"
    />
  );
}
