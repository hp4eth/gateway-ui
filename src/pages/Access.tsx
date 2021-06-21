import { ReactElement, useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { ArrowLeft, CornerUpLeft, Search } from 'react-feather'
import Tooltip from '@material-ui/core/Tooltip'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { Utils } from '@ethersphere/bee-js'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

import * as ROUTES from '../Routes'

import text from '../translations'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    footerReservedSpace: {
      height: theme.spacing(10), // Filler space so that the layout of the page does not change as users write text
    },
  }),
)

export default function AccessPage(): ReactElement {
  const classes = useStyles()
  const history = useHistory()

  const [hash, setHash] = useState<string>('')
  const [hashError, setHashError] = useState<boolean>(false)

  useEffect(() => {
    if (!hash || Utils.Hex.isHexString(hash, 64) || Utils.Hex.isHexString(hash, 128)) setHashError(false)
    else setHashError(true)
  }, [hash])

  return (
    <Layout
      top={[
        <Header
          key="top1"
          leftAction={
            <IconButton
              onClick={() => {
                history.push(ROUTES.LANDING_PAGE)
              }}
            >
              <ArrowLeft />
            </IconButton>
          }
        >
          {text.accessPage.header}
        </Header>,
        <Typography key="top2" variant="subtitle1">
          {text.accessPage.tagline}
        </Typography>,
      ]}
      center={[
        <div key="center1">
          <Tooltip
            title={text.accessPage.hashLengthWarning}
            placement="top"
            open={hashError}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <InputBase
              className={classes.button}
              placeholder="Paste Swarm Hash Here"
              onChange={event => setHash(event.target.value)}
              value={hash}
              multiline
              style={{ backgroundColor: 'white' }}
            />
          </Tooltip>
          <Button
            key="center2"
            className={classes.button}
            size="small"
            style={{ marginTop: 2, paddingLeft: 16, paddingRight: 16, opacity: hash ? 1 : 0 }}
            onClick={() => setHash('')}
          >
            <CornerUpLeft />
            {text.accessPage.backAction}
            <CornerUpLeft style={{ opacity: 0 }} />
          </Button>
        </div>,
      ]}
      bottom={[
        <Footer key="bottom1">
          <div>
            {hash && (
              <Button
                className={classes.button}
                disabled={hashError}
                onClick={() => history.push(ROUTES.ACCESS_HASH(hash))}
                size="large"
              >
                <Search />
                {text.accessPage.findAction}
                <Search style={{ opacity: 0 }} />
              </Button>
            )}
          </div>
        </Footer>,
        <Typography key="bottom2" variant="body2" style={{ opacity: hash ? 0 : 1 }}>
          {text.accessPage.disclaimer}
        </Typography>,
      ]}
    />
  )
}