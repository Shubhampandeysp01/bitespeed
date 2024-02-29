import prisma from "@/lib/prisma";
import Contact from "./components/Contact";
import Link from "next/link";

async  function getContact(){
  const contacts = prisma.contact.findMany();
  return contacts;
}

export default async function Home() {
  const contacts = await getContact();
  console.log(contacts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/identify'}>/identify</Link>
      <h1>Feed</h1>
      {contacts.map((contact)=>{
        return(
          <Contact
          key={contact.id}
          id={contact.id}
          phoneNumber={contact.phoneNumber}
          email={contact.email}
          linkedId={contact.linkedId}
          linkPrecedence={contact.linkPrecedence}
          createdAt={contact.createdAt}
          updatedAt={contact.updatedAt}
          deletedAt={contact.deletedAt}
          />
        )
      })}
    </main>
  );
}
