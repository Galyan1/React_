import React, {Component} from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostStatusFilter from '../post-status-filter/';
import PostList from '../post-list/';
import PostForm from '../post-add-form/';
import './app.css';

export default class App extends Component{
    constructor (props){
        super(props);
        this.state = {
            data: [
                {id:1, label:'going to learn JS', important: false, like: false },//ключи чтоб не было перезагрузки страницы при добавлении новых эл-ов
                {id:2, label:'it is so good', important: false, like: false },
                {id:3, label:'i need a break...', important: false, like: false }],
            tern: '',
            filter: 'all'
        };

        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

    }


    deleteItem(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index +1);

            const newArr = [...before, ...after];
            
            return{
                data: newArr
            }

        });
    }
    addItem(body){
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return{
                data: newArr
            }
        })
    }

    likeAndImportant(){
        
    }


    onToggleLike(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like} // вместо старого объекта

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];

            return{
                data: newArr
            }
        })
    }
    onToggleImportant(id){
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important} // вместо старого объекта

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];

            return{
                data: newArr
            }
        })
    }

    searchPost(items, tern){
        if (tern.length === 0){
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(tern) > -1
        })
    }

    filterPost(items, filter){
        if (filter === 'like'){
            return items.filter(item => item.like)
        }
        else{
            return items
        }
    }

    onUpdateSearch(tern){
        this.setState({tern: tern});
    }

    onFilterSelect(filter){
        this.setState({filter: filter});
    }

    render(){
        const {data, tern, filter} = this.state;
        const liked = data.filter(item => item.like).length;//длинна нового массива с лайками
        const allPosts = data.length; //длинна всего массива дата
        const visiblePosts = this.filterPost(this.searchPost(data, tern), filter);

        return (<div className = 'app'>
        <AppHeader like = {liked} allPosts = {allPosts}/>
        <div className = 'search-panel d-flex'>
        <SearchPanel onUpdateSearch = {this.onUpdateSearch} />
        <PostStatusFilter filter = {filter}
        onFilterSelect = {this.onFilterSelect}/>
        </div>
        <PostList posts = {visiblePosts} onDelete = {this.deleteItem} onToggleImportant = {this.onToggleImportant} onToggleLike = {this.onToggleLike}/> 
        <PostForm onAdd = {this.addItem}/>
    </div>)
    }  
}

 