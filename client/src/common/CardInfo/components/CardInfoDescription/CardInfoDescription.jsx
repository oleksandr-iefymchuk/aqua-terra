import './CardInfoDescription.scss';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ReactMarkdown from 'react-markdown';
import { useTabContext } from '../../../../contexts/TabControlContext';

import ButtonWrapper from '../../../Button/Button';
import Reviews from './components/Reviews/Reviews';

const CardInfoDescription = ({
  id,
  description,
  param,
  reviews,
  setReviews,
}) => {
  const { value, setValue } = useTabContext();
  const [markdown, setMarkdown] = useState('');
  const [isExpandedDescription, setIsExpandedDescription] = useState(false);
  const [isExpandedCharacteristics, setIsExpandedCharacteristics] =
    useState(false);

  const productReviews = reviews.filter((review) => review.productId === id);
  console.log('productReviews:', productReviews);

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
              borderBottom: '3px solid #008ec8',
            },
          },
        },
      },
    },
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

  // const markdownPath =
  //   window.location.hostname === '127.0.0.1'
  //     ? '/public/markdown/'
  //     : '/markdown/';

  useEffect(() => {
    fetch(`/public/markdown/${description}`)
      .then((res) => res.text())
      .then((markdown) => {
        setMarkdown(markdown);
      });
  }, [description]);

  return (
    <div className="cardInfoDescription" id="reviews">
      <ThemeProvider theme={styles}>
        <TabContext value={value}>
          <TabList onChange={handleChangeTab} className="customTabList">
            <Tab label="Опис" value="description" />
            <Tab label="Характеристики" value="characteristics" />
            <Tab label="Відгуки" value="reviews" />
          </TabList>
          <TabPanel value="description" className="description">
            <div
              className={
                isExpandedDescription ? 'contentExpanded' : 'contentCollapsed'
              }
            >
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
            {markdown.split('\n').length > 10 && (
              <ButtonWrapper
                buttonClassName="expandBtn"
                icon={isExpandedDescription ? 'collapse' : 'expand'}
                onClick={toggleExpandDescription}
                buttonText={
                  isExpandedDescription ? 'Згорнути' : 'Показати повністю'
                }
              />
            )}
          </TabPanel>
          <TabPanel value="characteristics" className="characteristics">
            <div
              className={
                isExpandedCharacteristics
                  ? 'contentExpanded'
                  : 'contentCollapsed'
              }
            >
              {renderCharacteristics()}
            </div>
            {Object.keys(param).length > 6 && (
              <ButtonWrapper
                buttonClassName="expandBtn"
                icon={isExpandedCharacteristics ? 'collapse' : 'expand'}
                onClick={toggleExpandCharacteristics}
                buttonText={
                  isExpandedCharacteristics ? 'Згорнути' : 'Показати повністю'
                }
              />
            )}
          </TabPanel>
          <TabPanel value="reviews" className="reviews">
            <Reviews id={id} reviews={reviews} setReviews={setReviews} />
          </TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  );
};

CardInfoDescription.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  param: PropTypes.object,
  reviews: PropTypes.array,
  setReviews: PropTypes.func,
};

export default CardInfoDescription;
