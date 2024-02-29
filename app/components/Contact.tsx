interface ContactProps {
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  function FormatDate(date: Date): string {
    return date.toLocaleString();
  }
  

export default function Contact({id, phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt }:ContactProps){
return(
    <div style={{border:'1px solid black', padding:'15px', margin:'10px 0px'}}>
        <h3>{id}</h3>
        <h3>{phoneNumber}</h3>
        <h3>{email}</h3>
        <h3>{linkedId}</h3>
        <h3>{linkPrecedence}</h3>
        <h3>Created At: {FormatDate(createdAt)}</h3>
      <h3>Updated At: {FormatDate(updatedAt)}</h3>
      <h3>Deleted At: {deletedAt ? FormatDate(deletedAt) : 'Not Deleted'}</h3>
        

    </div>
)
}