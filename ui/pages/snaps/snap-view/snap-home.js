import React from 'react';
import PropTypes from 'prop-types';

import { SnapHomeRenderer } from '../../../components/app/snaps/snap-home-page/snap-home-renderer';
import { Box } from '../../../components/component-library';
import { BlockSize } from '../../../helpers/constants/design-system';

function SnapHome({ snapId }) {
  return (
    <Box height={BlockSize.Full}>
      <SnapHomeRenderer snapId={snapId} />
    </Box>
  );
}

SnapHome.propTypes = {
  snapId: PropTypes.string.isRequired,
};

export default SnapHome;
