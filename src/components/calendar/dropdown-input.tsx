import React, { useState } from 'react'
import './dropdown-input.less'

type Item = number

type Props = {
    items: Item[],
    initialItem: number,
    selectItem: (item: Item) => void,
}

export const DropdownInput = (props: Props) => {
    const {items, initialItem, selectItem} = props
    const [listIsOpen, setListIsOpen] = useState(false)
    const [item, setItem] = useState(initialItem)

    const toggleList = () => {
        setListIsOpen(!listIsOpen)
    }

    const select = (item: number) => {
        setItem(item)
        setListIsOpen(false)
        selectItem(item)
    }

    return (
        <div className='dd-container'>
            <div className='dd-header' onClick={toggleList}>
                <div className='dd-header-title'>{item}</div>
                {
                    listIsOpen
                        ? <div className='dd-header-btn'>-</div>
                        : <div className='dd-header-btn'>+</div>
                }
            </div>
            {listIsOpen && <ul className='dd-list'>
                {items.map((item: Item) => <li onClick={() => select(item)} className='dd-list-item' key={item}>{item}</li>)}
            </ul>}
        </div>

    )
}