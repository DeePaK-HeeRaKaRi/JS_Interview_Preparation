// The Mediator pattern provides central authority over a group of objects by controlling how these objects interact with each other. 
// The "central" object is known as the 'mediator'. The mediator pattern is useful in scenarios where every object needs to be aware of any state change in any other object in the group.
function Member(name){
    this.name=name
    this.chatroom=null
}
Member.prototype={
    send:function(message,toMember){
        this.chatroom.send(message,this,toMember)
    },
    receive:function(message,fromMember){
        console.log(`${fromMember.name} to ${this.name}: ${message}`)
    }
}
function Chatroom(){
    this.members={}
}
Chatroom.prototype={
    addmember:function(member){
        this.members[member.name]=member
        member.chatroom=this
    },
    send:function(message,fromMember,toMember){
        toMember.receive(message,fromMember)
    },
    members:function(){
        return this.members
    }
}

const chat=new Chatroom()

const bob=new Member("bob")
const tim=new Member("tim")
const john=new Member("john")

chat.addmember(bob)
chat.addmember(john)
chat.addmember(tim)

bob.send("Hey, John", john)
john.send("What's up, Bob", bob)
tim.send("John, are you ok?", john)
console.log(chat.members)