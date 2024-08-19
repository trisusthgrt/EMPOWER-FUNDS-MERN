function PageTitle({ title }: { title: string }) {
  return <h1 className="text-primary text-xl font-bold">{title}</h1>;
}

export default PageTitle;
// The selected code defines a React functional component named `PageTitle`. This component takes a prop called `title` of type `string`. Inside the component, it returns a JSX element representing an `<h1>` HTML tag with the specified class names and content. The content is the value of the `title` prop, which is wrapped in curly braces `{}` to indicate that it should be evaluated as JavaScript code. The class names `"text-primary text-xl font-bold"` are used to style the text within the `<h1>` tag. This component can be used to display a page title with consistent styling across different parts of an application.