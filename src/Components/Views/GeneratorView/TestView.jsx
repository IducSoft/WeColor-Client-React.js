import React, {useState} from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



 function User({user}) {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable(
        {id:user.id}
    )

    const style = {
        transform: CSS.Transform.toString(transform),
        transition:{
            duration: 1000, // milliseconds
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          },
        border:"0.5px solid gray"
    }

  return (
    <>
        <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
         className="bg-white p-4 w-10/12 rounded-md shadow-md text-black my-2 ml-3" >
            <h1>{user.name}</h1>
            <span>{user.id}</span>
        </div>
    </>
  );
}


const TestView = () => {

    const [people, setpeople] = useState([
        {name:"John", id:1},
        {name:"Mary", id:2},
        {name:"Mike", id:3},
        {name:"Emma", id:4}
    ]);

    const handleDragEnd =(e)=>{
        const { active, over } = e
        console.log(active);
        console.log(over);

       const oldIndex = people.findIndex( person => person.id == active.id )
       const newIndex = people.findIndex( person => person.id == over.id )
    
       console.log(oldIndex)
       console.log(newIndex)

       const newOrder = arrayMove(people, oldIndex, newIndex )
       setpeople(newOrder);

    }


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
        <h1 className="text-2xl font-bold text-center"  >User list</h1>
        <SortableContext
        items={people}
        strategy={horizontalListSortingStrategy}
        ><div className="flex" >
            {
                people.map((user)=>(
                    <User user={user} />
                ))
            }
        </div>
        </SortableContext>
    </DndContext>
  )
}

export default TestView