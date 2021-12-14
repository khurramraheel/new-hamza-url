import React,{Component} from 'react'

export const Uml = () => {
    const image ={
        width:500
    }

    
    return (
        <div className='detail'>
            <header className='black'><h1>UML DIAGRMA AND ITS TYPES</h1></header>
            <h3 className='heading'>UML</h3>
            <h5>UML stands for Unified Modeling Language. It’s a rich language to model software solutions, application structures, system behavior and business processes. There are 14 UML diagram types to help you model these behaviors.

You can draw UML diagrams online using our software.</h5>

<h3 className='heading'> List of UML Diagram Types</h3>
<h3 className='heading'>CLASS DIAGRAM</h3>
<h5>Class diagrams are the main building block of any object-oriented solution. It shows the classes in a system, attributes, and operations of each class and the relationship between each class.
In most modeling tools, a class has three parts. Name at the top, attributes in the middle and operations or methods at the bottom. In a large system with many related classes, classes are grouped together to create class diagrams. Different relationships between classes are shown by different types of arrows.</h5>
 {/* <img  style={image} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1MnNIXdjXuPurd48OrsEfQxG-OwSPAjfeZA&usqp=CAU'/>        */}
 <h3 className='heading'>COMPENENT DIAGRAM</h3>
 <h5>A component diagram displays the structural relationship of components of a software system. These are mostly used when working with complex systems with many components. Components communicate with each other using interfaces. The interfaces are linked using connectors.</h5>
    {/* <img style={image} src='https://d3n817fwly711g.cloudfront.net/uploads/2012/02/Component-Diagram.jpg'/> */}
    <h3 className='heading'>Use Case  DIAGRAM</h3>
    <h5>As the most known diagram type of the behavioral UML types, Use case diagrams give a graphic overview of the actors involved in a system, different functions needed by those actors and how these different functions interact.

It’s a great starting point for any project discussion because you can easily identify the main actors involved and the main processes of the system. You can create use case diagrams using our tool and/or get started instantly using our use case templates.</h5>
    {/* <img style={image} src='https://d3n817fwly711g.cloudfront.net/uploads/2012/02/Use-Case-Diagram.jpg'/> */}
    <h3 className='heading'>SEQUENCE  DIAGRAM</h3>
    <h5>Sequence diagrams in UML show how objects interact with each other and the order those interactions occur. It’s important to note that they show the interactions for a particular scenario. The processes are represented vertically and interactions are shown as arrows. This article explains the purpose and the basics of Sequence diagrams. Also, check out this complete Sequence Diagram Tutorial to learn more about sequence diagrams.

You can also instantly start drawing using our sequence diagram templates.

</h5>
{/* <img style={image} src='https://d3n817fwly711g.cloudfront.net/uploads/2012/02/Sequence-Diagram.jpg'/> */}
<h3 className='heading'>ACTIVITY  </h3>
    <h5>Activity diagrams represent workflows in a graphical way. They can be used to describe the business workflow or the operational workflow of any component in a system. Sometimes activity diagrams are used as an alternative to State machine diagrams. Check out this wiki article to learn about symbols and usage of activity diagrams. You can also refer this easy guide to activity diagrams.</h5>
{/* <img style={image} src='https://d3n817fwly711g.cloudfront.net/uploads/2012/02/Activity-Diagram.jpg'/> */}
<h3 className='heading'>State Machine Diagram</h3>
<h5>State machine diagrams are similar to activity diagrams, although notations and usage change a bit. They are sometimes known as state diagrams or state chart diagrams as well. These are very useful to describe the behavior of objects that act differently according to the state they are in at the moment. The State machine diagram below shows the basic states and actions.</h5>
<h3 className='heading'>Communication DIAGRAM</h3>
<h5>In UML 1 they were called collaboration diagrams. Communication diagrams are similar to sequence diagrams, but the focus is on messages passed between objects. The same information can be represented using a sequence diagram and different objects</h5>
        </div>
    )
}
