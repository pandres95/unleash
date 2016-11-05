import React, { PropTypes } from 'react';

import { Link } from 'react-router';
import FontIcon from 'react-toolbox/lib/font_icon';
import Switch from 'react-toolbox/lib/switch';
import { ListItem } from 'react-toolbox/lib/list';
import Chip from 'react-toolbox/lib/chip';

import style from './feature.scss';

const Feature = ({ feature, onFeatureClick, onFeatureRemove, metrics = { yes: 0, no: 0, hasData: false } }) => {
    const { name, description, enabled, strategies, createdAt } = feature;
    const created = new Date(createdAt);

    const actions = [
        <div key="strategies">{strategies && strategies.map((s, i) => <Chip key={i}><small>{s.name}</small></Chip>)}</div>,
        <div key="created"><small>({created.toLocaleDateString('nb-NO')})</small></div>,
        <Link key="change" to={`/features/edit/${name}`} title={`Edit ${name}`}>
            <FontIcon value="edit" className={style.action} />
        </Link>,
        <FontIcon key="delete" className={style.action} value="delete" onClick={() => onFeatureRemove(name)} />,
    ];

    const leftActions = [
        <Chip><span className={style.yes}>{metrics.yes}</span> / <span className={style.no}>{metrics.no}</span></Chip>,
        <Switch key="left-actions" onChange={() => onFeatureClick(feature)} checked={enabled} />,
    ];

    return (
        <ListItem
            key={name}
            leftActions={leftActions}
            rightActions={actions}
            caption={name}
            legend={(description && description.substring(0, 100)) || '-'}
        />
    );
};

Feature.propTypes = {
    feature: PropTypes.object,
    onFeatureClick: PropTypes.func,
    onFeatureRemove: PropTypes.func,
};

export default Feature;