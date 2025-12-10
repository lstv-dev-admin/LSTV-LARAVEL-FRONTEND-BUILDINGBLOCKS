interface Props {
    title: string;
    subTitle: string;
}

const PageHeader = (props: Props) => {
    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight w-fit"> 
                {props.title} 
            </h1>
            <p className="text-muted-foreground max-w-[800px]">
                {props.subTitle}    
            </p>
        </div>
    );
};

export default PageHeader