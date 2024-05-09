import { createContext,useContext } from "react";

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:'Todo Message',
            completed:false
        }
    ],
    // Iam not defining any functionalities iam just creating their names
    // Functions will be provided in the place of context.provider
    
    addTodo:(todo)=>{},
    // Adding requires only the message
    updateTodo:(id,todo)=>{},
    // UPdate requires the place and message to be updated
    deleteTodo:(id)=>{},
    // Delete requires only id not messsage bcoz there can be same messages
    toggleComplete:()=>{id}
    // Used to toggle the particular id if completed
})


export const useTodo=()=>{
        return useContext(TodoContext)
}

// The below line is optional to make the provider being simple.
export const TodoProvider=TodoContext.Provider

// Keeping all the contexts needed in one files
// This is how the real world works
// And it is a kind of best practices