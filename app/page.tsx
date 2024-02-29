import prisma from "@/lib/prisma";
import Contact from "./components/Contact";
import Link from "next/link";
import Button from '@mui/material/Button';

async  function GetContact(){
  const contacts = prisma.contact.findMany();
  return contacts;
}

export default async function Home() {
  const contacts = await GetContact();
  console.log(contacts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button href={'/identify'} variant="contained" color="primary">identify</Button>
      <h1>All Records</h1>
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
