import './css/style.css'
import FullList from './model/FullList'
import ListBox from './template/ListBox'
import ListItem from './model/ListItem'


const app = (): void => {
  const fullList = FullList.instance
  const listBox = ListBox.instance

  const listForm = document.getElementById('itemEntryForm') as HTMLFormElement
  listForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()

    const input = document.getElementById('newItem') as HTMLInputElement
    const inputValue: string = input.value.trim()
    if(!inputValue.length) return

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), inputValue)

    fullList.addItem(newItem)
    listBox.render(fullList)
    
  })
  
  const clear = document.getElementById('clearItemsButton') as HTMLButtonElement
  clear.addEventListener('click', ()=>{
    fullList.clearList()
    listBox.clear()
  })

  fullList.load()
  listBox.render(fullList)
}

document.addEventListener('DOMContentLoaded', app)