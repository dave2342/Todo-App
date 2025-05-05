//Import your TodoList Client Component
import TodoList from "./components/TodoList";
import { Todo } from "./lib/types";

//Helper function to shuffle and get 3 random todos
//Fisher Yates (found online)
function getTodos(todos: Todo[]): Todo[] {
  const result = [...todos];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, 3); //3 todos
}

export default async function Page() {
  //begin as empty array to hold Todo objects
  let yourRandomTodos: Todo[] = [];
  let errorMessage = false;

  //Use try... catch block to fetch data
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    //check if the response.ok is true, if not, throw an error
    if (!response.ok) {
      throw new Error("Cannot fetch the response!");
    }
    //parse JSON asserting type is Todo[]
    const todos = (await response.json()) as Todo[];
    //call function to select 3 random todos
    yourRandomTodos = getTodos(todos);
    //catch error, make errorMessage true
  } catch (error) {
    errorMessage = true;
  }

  return (
    <div>
      {/*If errorMessage is true, display an error message. conditional rendering */}
      {errorMessage ? (
        <div>Failed to load initial todos.</div>
      ) : (
        <TodoList initialTodos={yourRandomTodos} />
      )}
    </div>
  );
}
