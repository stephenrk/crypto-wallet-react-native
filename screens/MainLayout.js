import React, { useEffect } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { IconTextButton } from '../components'
import { COLORS, icons, SIZES } from '../constants'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'

const MainLayout = ({ children, isTradeModalVisible }) => {

    const modalAnimatedValue = useSharedValue(0)
    const { height } = useWindowDimensions()

    useEffect(() => {
        if (isTradeModalVisible) {
            modalAnimatedValue.value = withTiming(1)
        } else {
            modalAnimatedValue.value = withTiming(0)
        }
    }, [isTradeModalVisible])

    const dimStyle = useAnimatedStyle(() => ({
        opacity: modalAnimatedValue.value
    }))

    const modalStyle = useAnimatedStyle(() => ({
        top: interpolate(
            modalAnimatedValue.value,
            [0, 1],
            [height, height - 320]
        )
    }))

    return (
        <View style={{ flex: 1 }}>
            {children}

            {/* Dim Background */}
            <Animated.View
                style={[dimStyle, {
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: COLORS.transparentBlack,
                }]}
            />

            {/* Modal */}
            <Animated.View
                style={[modalStyle, {
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary
                }]}
            >
                <IconTextButton label="Transfer" icon={icons.send} onPress={() => console.log("Transfer")} />
                <IconTextButton label="Withdraw" icon={icons.withdraw} containerStyle={{ marginTop: SIZES.base }} onPress={() => console.log("Withdraw")} />
            </Animated.View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isTradeModalVisible: state.tabReducer.isTradeModalVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
