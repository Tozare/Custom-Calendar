import React, {useState} from 'react'
import './list-input.less'
import {Link, useHistory, useParams} from "react-router-dom";

type Props = {
    pickItem: (item: string) => void,
    items: string[],
    pickedItem: string
}


export const ListInput = (props: Props) => {

    let { yearParam, monthParam, dayParam } = useParams();
    console.log(useParams())
    const history = useHistory()

    const {items, pickItem, pickedItem} = props

    const [isItemListAvailable, setIsItemListAvailable] = useState(false)

    const pick = (item: string) => {
        pickItem(item)
        setIsItemListAvailable(false)
        history.push(`/${item}/${yearParam}/${monthParam}/${dayParam}`)
    }

    return (
        <div className='list-input-container'>
            <div className='picked-item' onClick={() => setIsItemListAvailable(!isItemListAvailable)}>{pickedItem}</div>
            {
                isItemListAvailable &&
                <div className='list-items'>
                    {items.map(item =>
                        <div className='item' onClick={() => pick(item)}>
                            {item}
                        </div>
                    )}
                </div>
            }
        </div>
    )
}