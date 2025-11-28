import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { rootActions } from '@/store/root-actions'
import { bindActionCreators } from 'redux'

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootActions ,dispatch), [dispatch]);
}