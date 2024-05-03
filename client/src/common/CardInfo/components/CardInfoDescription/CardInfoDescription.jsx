import './CardInfoDescription.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useTabContext } from '../../../../contexts/TabControlContext';

import ButtonWrapper from '../../../Button/Button';
import Reviews from './components/Reviews/Reviews';
import Markdown from 'markdown-to-jsx';

const CardInfoDescription = ({ productId, description, param, setReviews }) => {
  const { value, setValue } = useTabContext();
  const [markdown, setMarkdown] = useState('');
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedCharacteristics, setIsExpandedCharacteristics] =
    useState(false);

  // const productReviews = reviews.filter(review => review.productId === id);
  // console.log('productReviews:', productReviews);

  const toggleExpandDescription = () =>
    setIsExpandedDescription(!isExpandedDescription);

  const toggleExpandCharacteristics = () =>
    setIsExpandedCharacteristics(!isExpandedCharacteristics);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const styles = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            width: 'auto',
            fontSize: '16px',
            borderBottom: '3px solid #fff',
            marginRight: '5px',
            padding: '5px',
            '&:hover': {
              background: 'transparent',
              borderBottom: '3px solid #008ec8'
            }
          }
        }
      }
    }
  });

  const renderCharacteristics = () => (
    <table>
      <tbody>
        {Object.entries(param).map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const markdownPath =
    window.location.hostname === '127.0.0.1' ? '/public/markdown' : '/markdown';

  useEffect(() => {
    if (description) {
      fetch(`${markdownPath}/${description}`)
        .then(res => res.text())
        .then(markdown => {
          setMarkdown(markdown);
        });
    }
  }, [description, markdownPath]);

  return (
    <div className='card-info-description' id='reviews'>
      <ThemeProvider theme={styles}>
        <TabContext value={value}>
          <TabList onChange={handleChangeTab} className='custom-tab-list'>
            <Tab label='Опис' value='description' />
            <Tab label='Характеристики' value='characteristics' />
            <Tab label='Відгуки' value='reviews' />
          </TabList>
          <TabPanel value='description' className='description'>
            <div
              className={
                isExpandedDescription ? 'content-expanded' : 'content-collapsed'
              }
            >
              <Markdown>{markdown}</Markdown>
            </div>
            {markdown.split('\n').length > 10 && (
              <ButtonWrapper
                buttonClassName='expand-btn'
                icon={isExpandedDescription ? 'collapse' : 'expand'}
                onClick={toggleExpandDescription}
                buttonText={
                  isExpandedDescription ? 'Згорнути' : 'Показати повністю'
                }
              />
            )}
          </TabPanel>
          <TabPanel value='characteristics' className='characteristics'>
            <div
              className={
                isExpandedCharacteristics
                  ? 'content-expanded'
                  : 'content-collapsed'
              }
            >
              {renderCharacteristics()}
            </div>
            {Object.keys(param).length > 6 && (
              <ButtonWrapper
                buttonClassName='expand-btn'
                icon={isExpandedCharacteristics ? 'collapse' : 'expand'}
                onClick={toggleExpandCharacteristics}
                buttonText={
                  isExpandedCharacteristics ? 'Згорнути' : 'Показати повністю'
                }
              />
            )}
          </TabPanel>
          <TabPanel value='reviews' className='reviews'>
            <Reviews productId={productId} setReviews={setReviews} />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
};

CardInfoDescription.propTypes = {
  productId: PropTypes.string,
  description: PropTypes.string,
  param: PropTypes.object,
  setReviews: PropTypes.func
};

export default CardInfoDescription;
