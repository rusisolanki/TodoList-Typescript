import ListItem from "./ListItem";

interface List{
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void
}

export default class FullList implements List {
    static instance = new FullList()

    private constructor(private _list: ListItem[] = []){}

    get list(): ListItem[] {
        return this._list
    }
    set list(list: ListItem[]) {
        this._list = list
    }

    load(){
        const storedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(localStorage.getItem('List')!)
        
        storedList.forEach(item => {
            const newList = new ListItem(item._id, item._item, item._checked)
            FullList.instance.addItem(newList)
        })

    }

    save() {
        localStorage.setItem('List', JSON.stringify(this._list))
    }

    clearList(){
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem){
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string){
            this._list = this._list.filter((item) => item.id !== id)
            this.save()
    }
}