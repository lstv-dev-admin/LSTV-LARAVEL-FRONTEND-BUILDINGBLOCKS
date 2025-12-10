export const downloadBlob = (blob: Blob, filename: string) => {
	const sanitizedFilename = filename?.trim().length ? filename : "download";
	const downloadUrl = window.URL.createObjectURL(blob);
	const link = document.createElement("a");

	link.href = downloadUrl;
	link.download = sanitizedFilename;
	link.rel = "noopener noreferrer";

	document.body.appendChild(link);
	link.click();
	link.remove();

	window.URL.revokeObjectURL(downloadUrl);
};

