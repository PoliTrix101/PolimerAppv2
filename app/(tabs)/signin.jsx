import { Link, router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
	const { setIsLogin } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function handleSignIn() {
		if (username.trim() === "admin" && password === "pass1234") {
			setIsLogin(true);
			router.replace("/(tabs)");
			return;
		}

		Alert.alert("Sign-in failed", "Use admin and pass1234 for testing.");
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<View style={styles.form}>
				<Text style={styles.title}>Sign in</Text>
				<Text style={styles.subtitle}>Welcome back to PolimerApp</Text>

				<TextInput
					style={styles.input}
					placeholder="Username"
					value={username}
					onChangeText={setUsername}
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
				/>

				<TouchableOpacity style={styles.button} onPress={handleSignIn}>
					<Text style={styles.buttonText}>Sign in</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Text>Need an account? </Text>
					<Link href="/login" style={styles.link}>
						Log in
					</Link>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 24,
		backgroundColor: "#fff",
	},
	form: {
		width: "100%",
		maxWidth: 420,
		alignSelf: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		color: "#666",
		textAlign: "center",
		marginBottom: 28,
	},
	input: {
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 15,
	},
	button: {
		height: 50,
		backgroundColor: "#007AFF",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "700",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 20,
	},
	link: {
		color: "#007AFF",
		fontWeight: "700",
	},
});
