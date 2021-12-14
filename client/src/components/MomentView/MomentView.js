import React, { useEffect, useState } from 'react'

import { addEmailToMoment, deleteEmailFromMoment } from '../../actions'

export const MomentView = (props) => {
    const { moment, setContent } = props

    const [emails, setEmails] = useState(moment.emails)

    const handleAdd = async (email) => {
        try {
            await addEmailToMoment(moment._id, email)
        } catch (err) {
            return
        }
        setEmails(prev => [...prev, email])
    }

    const handleDelete = async (email) => {
        try {
            await deleteEmailFromMoment(moment._id, email)
        } catch (err) {
            return
        }
        setEmails(prev => prev.filter(e => e !== email))
    }

	return (
		<p>moment cire</p>

	);
}

