export function filterAutocomplete(value: string, arrayofElements: any[]): any[] {
  const filterValue = value.toLowerCase();
  console.log(value)
  console.log(arrayofElements)
  return arrayofElements.filter((state) =>
    state.value?.toLowerCase().startsWith(filterValue) 
  );
} 