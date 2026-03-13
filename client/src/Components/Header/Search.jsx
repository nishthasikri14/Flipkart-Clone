import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, InputBase, List, ListItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'; 
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
    search: {
        borderRadius: 2,
        marginLeft: 10,
        width: '38%',
        backgroundColor: '#fff',
        display: 'flex'
      },
      searchIcon: {
        marginLeft: 'auto',
        padding: 5,
        display: 'flex',
        color: 'blue'
      },
      inputRoot: {
        fontSize: 'unset',
        width: '100%'
      },
      inputInput: {
        paddingLeft: 20,
        width: '100%',
    },
    list: {
      position: 'absolute',
      color: '#000',
      background: '#FFFFFF',
      marginTop: 36,
      width: '38%', // Input ke barabar width
      boxShadow: '0 2px 4px 0 rgba(0,0,0,.23)' // Thoda sundar dikhne ke liye
    }
}))

const Search = () => {
    const classes = useStyle();
    // 1. Initial value empty string rakhein
    const [ text, setText ] = useState(''); 
    const [ open, setOpen ] = useState(true);

    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const getText = (text) => {
        setText(text);
        setOpen(false);
    }

    return (
        <div className={classes.search}>
            <InputBase
              placeholder="Search for products, brands and more"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
              value={text} // FIX: Yeh likhne mein madad karega
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {
              text && 
              <List className={classes.list} hidden={open}>
                {
                  // FIX: PostgreSQL mapping - product.title direct use karein
                  products.filter(product => {
                      const title = product.title?.longTitle || product.title || "";
                      return title.toLowerCase().includes(text.toLowerCase());
                  }).map(product => (
                    <ListItem key={product.id}>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => {
                            setOpen(true);
                            setText(''); // Click karne ke baad search saaf ho jaye
                        }}  
                      >
                        {/* FIX: PostgreSQL mapping */}
                        {product.title?.longTitle || product.title}
                      </Link>
                    </ListItem>
                  ))
                }  
              </List>
            }
        </div>
    )
}

export default Search;