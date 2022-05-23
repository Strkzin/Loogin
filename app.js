import React, {useState, useEffect} from 'react';
import{ View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Keyboard} from 'react-native';

export default function App() {

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));

    useEffect(()=> {
        KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow );
        KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide );



        Animated.parallel([
            Animated.spring(offset.y,{
                toValue:0,
                speed:4,
                bounciness: 15
            }),
            Animated.timing(opacity,{
                toValue:1,
                duration:100,
            })
        ]).start();
    }, [])

    function keyboardDidShow(){
        Animated.parallel([
            Animated.timing(logo.x,{
                tovalue:55,
                duration:100,
            }),
            Animated.timing(logo.y,{
                tovalue:65,
                duration:100,
            }),
            

        ]).start();

    }

    function keyboardDidHide(){

        Animated.parallel([
            Animated.timing(logo.x,{
                tovalue:130,
                duration:100,
            }),
            Animated.timing(logo.y,{
                tovalue:155,
                duration:100,
            }),
            

        ]).start();
    }

    return (
        <KeyboardAvoidingView style={StyleSheet.background}>
            <view style={styles.containerLogo}>
                <Animated.image
                style={{
                    width: logo.x,
                    height: logo.y,
                }}
                source={require('./src/assets/logo.png')}/>
            </view>

            <Animated.view style={[
                styles.container,
                {
                    opacity: opacity,
                    transform: [
                        {  translateY: offset.y }
                    ]
                }
                ]}>
                <TextInput
                style={styles.input}
                placeholder="email"
                autoCorrect={false}
                onChangeText={()=>{}}
                />
                <TextInput
                style={styles.input}
                placeholder="senha"
                autoCorrect={false}
                onChangeText={()=>{}}
                />

                <TouchableOpacity style={styles.btnSubmit}>
                    <Text>style={styles.submitText}Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text>style={styles.registerText}Cria sua conta</Text>
                </TouchableOpacity>
            </Animated.view>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191919'
    },
    containerLogo:{
        flex:1,
        justifyContent:'center',
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 50
    },
    input:{
        backgroundColor: '#FFF',
        width:'90%',
        marginBottom:15,
        color: '#222',
        fontSize:17,
        borderRadius: 7,
        padding: 10,

    },
    btnSubmit:{
        backgroundColor: '#35AAFF',
        width:'90%',
        height: 45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 7

    },
    submitText:{
        color:'#FFF',
        fontSize: 18,
    },

    btnRegister:{
        marginTop:10,
    },

    registerText:{
        color:'#FFF'
    }
    
});