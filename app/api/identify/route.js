import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        let primaryContactId;
        let secondaryContactIds = [];
        let emails = [];
        let phoneNumbers = [];

        const { phoneNumber, email } = await request.json();

        const sameRecords = await prisma.contact.findMany({
            where: {
                AND: [
                    { phoneNumber },
                    { email }
                ]
            },
            orderBy: {
                createdAt: 'asc' 
            }
        });

        if(sameRecords.length>0 ){
            if(phoneNumber == '' && email == ''){
                //Do we need to stop creating account if there is no phone and email?
            }
            else{
            const responseObject = {
                contact: {
                    errorMessage:"Email and Phone Number are same"
                    
                }
            };
    
            return NextResponse.json(responseObject);}
        }

        const existingContacts = await prisma.contact.findMany({
            where: {
                OR: [
                    { phoneNumber },
                    { email }
                ]
            },
            orderBy: {
                createdAt: 'asc' 
            }
        });

        if (existingContacts.length > 0) {
            primaryContactId = existingContacts[0].id;
            await prisma.contact.update({
                where: { id: primaryContactId },
                data: { linkPrecedence: "PRIMARY" }
            });
            emails = existingContacts.map(contact => contact.email);
            phoneNumbers = existingContacts.map(contact => contact.phoneNumber);

            if(existingContacts.length==1){
                const firstcontact = existingContacts[0];
                secondaryContactIds.push(firstcontact.id);
            }

            for (let i = 1; i < existingContacts.length; i++) {
                const contact = existingContacts[i];
                const updatedContact = await prisma.contact.update({
                    where: { id: contact.id },
                    data: { linkPrecedence: "SECONDARY", linkedId:primaryContactId }
                });
                secondaryContactIds.push(existingContacts[0].id);
                secondaryContactIds.push(updatedContact.id);
                
            }



            const newContact = await prisma.contact.create({
                data: {
                    phoneNumber,
                    email,
                    linkedId:primaryContactId,
                    linkPrecedence:"SECONDARY"
                }
            });
            primaryContactId = newContact.id;
            emails.push(newContact.email);
            phoneNumbers.push(newContact.phoneNumber);
            emails = [...new Set(emails)];
            phoneNumbers = [...new Set(phoneNumbers)];
            secondaryContactIds = [...new Set(secondaryContactIds)];
            const responseObject = {
                contact: {
                    primaryContactId,
                    emails,
                    phoneNumbers,
                    secondaryContactIds
                }
            };
    
            return NextResponse.json(responseObject);

        } else{
            const newContact = await prisma.contact.create({
                data: {
                    phoneNumber,
                    email,
                }
            });
            primaryContactId = newContact.id;
            emails.push(newContact.email);
            phoneNumbers.push(newContact.phoneNumber);
        

        emails = [...new Set(emails)];
        phoneNumbers = [...new Set(phoneNumbers)];
        secondaryContactIds = [...new Set(secondaryContactIds)];

        const responseObject = {
            contact: {
                primaryContactId,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        };

        return NextResponse.json(responseObject);
        }

    } catch (error) {
        return NextResponse.error("Error processing request");
    }
}
