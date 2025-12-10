import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ComponentProps } from "react";

interface TextAreaTestProps extends ComponentProps<"textarea"> {
	name: string;
	label?: string;
	error?: string;
}

const TextAreaTest = ({ name, label, error, ...props }: TextAreaTestProps) => {
	return (
		<div className="space-y-1">
			<Label htmlFor={name}>
				{label} {props.required && <span className="text-destructive">*</span>}
			</Label>
			<Textarea id={name} {...props} />
			{error && <p className="text-sm text-destructive">{error}</p>}
		</div>
	);
};

export default TextAreaTest;