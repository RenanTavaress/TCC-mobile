import react from 'react'
import { SendEmail } from '../../../components/SendEmail'

export function SendRating(){
   return <SendEmail endPoint='/api/rating/send/email'/>
}