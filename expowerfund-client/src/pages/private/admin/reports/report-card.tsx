function ReportCard({
  title,
  value,
  showCurrency = false,
}: {
  title: string;
  value: number;
  showCurrency?: boolean;
}) {
  return (
    <div className="border border-primary border-solid rounded-sm p-5 bg-gray-100 flex flex-col gap-7">
      <h1 className="text-lg font-bold text-primary">{title}</h1>
      <h1 className="text-5xl text-center font-bold text-primary">
        {showCurrency && "$"}
        {value}
      </h1>
    </div>
  );
}

export default ReportCard;
/*
The selected code defines a React functional component named `ReportCard`. This component takes three props: `title` (a string), `value` (a number), and `showCurrency` (an optional boolean with a default value of `false`).

Inside the `ReportCard` function, a div element is returned with the specified class names and styles. Inside this div, there are two h1 elements. The first h1 element displays the `title` prop with specific class names. The second h1 element displays the `value` prop, with an optional "$" symbol if the `showCurrency` prop is `true`. Both h1 elements have their own class names and styles.

The `ReportCard` component is then exported as the default export for use in other parts of the application.
*/